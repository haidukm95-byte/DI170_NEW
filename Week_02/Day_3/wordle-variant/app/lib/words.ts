// Dev Wordle - Programming terms word list (100 words)
export const WORD_LIST = [
  // Frontend & Frameworks
  'REACT', 'REDUX', 'PROPS', 'STATE', 'HOOKS', 'ASYNC', 'FETCH',
  'ROUTE', 'STYLE', 'MOUNT', 'RENDER', 'EVENT', 'TOAST',

  // Backend & Databases
  'CACHE', 'QUERY', 'INDEX', 'TABLE', 'JOINS', 'MODEL', 'ADMIN',
  'TOKEN', 'LOGIN', 'OAUTH', 'REDIS', 'MONGO', 'PSQL',

  // Programming Concepts
  'CLASS', 'TRAIT', 'MIXIN', 'SUPER', 'SCOPE', 'BLOCK', 'STACK',
  'QUEUE', 'ARRAY', 'TUPLE', 'UNION', 'TYPES', 'CONST', 'AWAIT',
  'YIELD', 'THROW', 'CATCH', 'FINAL', 'STATIC', 'VOID',

  // DevOps & Tools
  'BUILD', 'MAVEN', 'GRADLE', 'NGINX', 'DOCKER', 'KUBE', 'HELM',
  'CLOUD', 'AZURE', 'SCALE', 'SHARD', 'PROXY', 'LOAD',

  // Version Control & Collaboration
  'MERGE', 'CLONE', 'FETCH', 'RESET', 'STASH', 'PATCH', 'DIFF',
  'BLAME', 'AMEND', 'ALIAS', 'TRACK', 'STAGE',

  // Testing & Quality
  'DEBUG', 'TRACE', 'TESTS', 'MOCKS', 'STUB', 'ASSERT', 'SUITE',
  'BENCH', 'AUDIT', 'LINTER', 'FIXED',

  // Data Structures & Algorithms
  'GRAPH', 'NODES', 'EDGES', 'DEPTH', 'WIDTH', 'SORT', 'SEARCH',
  'HASH', 'TREE', 'HEAP', 'TRIE',

  // Web & Networking
  'HTTPS', 'AJAX', 'JSON', 'PATCH', 'POST', 'CORS', 'MIME',
  'GZIP', 'BLOB', 'CHUNK', 'WEBSOCKET', 'SSL',

  // Code Quality
  'CLEAN', 'SOLID', 'LINT', 'FORMAT', 'STYLE', 'REGEX', 'PARSE',
  'LOGIC', 'ERROR', 'PANIC', 'FATAL'
];

export const getRandomWord = (): string => {
  return WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
};

export const isValidWord = (word: string): boolean => {
  return WORD_LIST.includes(word.toUpperCase());
};