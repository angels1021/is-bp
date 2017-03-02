/**
 * manage untranslated message and aggregate
 */
import manageTranslations from 'react-intl-translations-manager';

import nodeGlob from 'glob';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import animateProgress from './helpers/progress';
import addCheckmark from './helpers/checkmark';
import extractMessages from '../translations/extractMessages';

const FILES_TO_PARSE = 'src/**/**.messages.js';
const EXTRACTED_PATH = 'internals/translations/extractedMessages/extractedMessages.json';
const MODULES_PATH   = 'internals/translations/extractedMessages/extractedModules.json';

const newLine = () => process.stdout.write('\n');

// Progress Logger
let progress;
const task = (message) => {
  progress = animateProgress(message);
  process.stdout.write(chalk.magenta(message));

  return (error) => {
    if (error) {
      process.stderr.write(chalk.red(error));
    }
    clearTimeout(progress);
    return addCheckmark(() => newLine());
  }
};

const glob = (pattern) => new Promise((resolve, reject) => {
  nodeGlob(pattern, (error, value) => (error ? reject(error) : resolve(value)));
});

const readFile = (fileName) => new Promise((resolve, reject) => {
  fs.readFile(fileName, (error, value) => (error ? reject(error) : resolve(value)));
});

const writeFile = (fileName, data) => new Promise((resolve, reject) => {
  fs.writeFile(fileName, data, (error, value) => (error ? reject(error) : resolve(value)));
});

const prettify = (json) => `${JSON.stringify(json, null, 2)}\n`;


// collect all messages here
const messages = [];
const modules = {};

// compile each file and add exported messages to collection
const extractFromFile = async (fileName) => {
  try{
    const code = await require(path.resolve(__dirname, `../../${fileName}`));
    const fileMessages = code.default;
    const { MODULE, PAGE } = fileMessages;
    // save each file to collection to be passed down to manager
    if(fileMessages) {
      const byId = extractMessages(fileMessages, 'message');
      let module = modules[MODULE];
      if(module) {
        const page = module[PAGE];
        module[PAGE] = !page ? byId : { ...page, ...byId };
      } else {
        modules[MODULE] = {};
        modules[MODULE][PAGE] = byId;
      }
      messages.push({
        fileName,
        descriptors: extractMessages(fileMessages, 'flatten')
      });
    }
  } catch (error) {
    process.stderr.write(`Error transforming file: ${fileName}\n${error}`);
  }
};

(async function main() {
  // collect all messages files
  const memoryTaskDone = task('Storing language files in memory');
  const files = await glob(FILES_TO_PARSE);
  memoryTaskDone();

  // aggregate all messages to a single object
  const extractTaskDone = task('Run extraction on all files');
  await Promise.all(files.map((fileName) => extractFromFile(fileName)));
  extractTaskDone();

  // save aggregated messages to file
  const saveTaskDone = task(`Writing all messages to ${EXTRACTED_PATH}`);
  let currentMessages = "{}";
  try {
    currentMessages = await readFile(EXTRACTED_PATH);
    currentMessages = prettify(JSON.parse(currentMessages));
  } catch (ex) {
    // no file
  }

  const prettified = prettify(messages);
  const prettifiedModules = prettify(modules);

  if (prettified !== currentMessages) {
    await writeFile(
      EXTRACTED_PATH,
      prettified
    );
    await writeFile(
      MODULES_PATH,
      prettifiedModules
    );
  }
  saveTaskDone();

  // extract translations to locale files and analyse
  manageTranslations({
    messagesDirectory: "internals/translations/extractedMessages",
    translationsDirectory: "internals/translations/locales",
    whitelistsDirectory: "internals/translations/whitelists",
    languages: ['en', 'he'],
    overrideCoreMethods: {
      provideExtractedMessages: () => messages,
      readMessageFiles: () => messages,
      afterReporting: () =>  {
        process.exit();
      }
    },

  });
})();

