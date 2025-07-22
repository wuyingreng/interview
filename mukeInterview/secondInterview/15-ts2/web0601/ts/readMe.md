# ts-node xx 不能有
1. package.json 里有 "type": "module"，导致 Node 以 ESM 方式运行。
2. tsconfig.json 里的 "module" 字段不是 "CommonJS"（比如 "ESNext"）。