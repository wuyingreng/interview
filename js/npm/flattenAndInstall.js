class Node {
  constructor(packageName, version) {
    this.packageName = packageName;
    this.version = version;
    this.children = {};
  }
}

// 模拟缓存 fetched package.jsons
const fetchedPackages = {};

function fetchPackageJson(packageName, version) {
  // 模拟获取package.json的逻辑
  // 这里我们用缓存来防止无限递归
  if (fetchedPackages[packageName + "@" + version]) {
    return fetchedPackages[packageName + "@" + version];
  }

  // 假设返回一个固定模板
  const result = {
    name: packageName,
    version: version,
    dependencies: {
      // 模拟子依赖
      "example-package": "^1.0.0",
    },
  };

  fetchedPackages[packageName + "@" + version] = result;

  return result;
}

// 构建依赖树
function buildDependencyTree(packageJson) {
  let root = new Node(packageJson.name, packageJson.version);

  function addDependencies(node, dependencies) {
    Object.keys(dependencies).forEach((dep) => {
      const version = dependencies[dep];
      if (!node.children[dep]) {
        node.children[dep] = new Node(dep, version);
      }
      // 递归添加子依赖，避免无限递归的模拟逻辑
      const childKey = dep + "@" + version;
      if (fetchedPackages[childKey]) {
        // 已经访问过的包不再递归
        return;
      }
      const childPackageJson = fetchPackageJson(dep, version);
      addDependencies(node.children[dep], childPackageJson.dependencies || {});
    });
  }

  addDependencies(root, packageJson.dependencies || {});
  return root;
}

// 处理版本冲突并扁平化安装
function flattenAndInstall(depTree, flatDependencies = {}, parent = null) {
  console.log("depTree.children==>", depTree.children);
  Object.keys(depTree.children).forEach((depName) => {
    console.log("depName==>", depName);
    console.log("parent==>", parent);
    const child = depTree.children[depName];
    const existingVersion = flatDependencies[depName];
    if (existingVersion && existingVersion !== child.version) {
      // 版本冲突时，将这个依赖包嵌套安装在父包中
      if (parent) {
        if (!parent.node_modules[depName]) {
          parent.node_modules[depName] = installPackage(
            child.packageName,
            child.version
          );
        }
      } else {
        // 顶层冲突处理逻辑
        console.warn("Version conflict at the root level:", depName);
        if (!parent.node_modules[depName]) {
          parent.node_modules[depName] = installPackage(
            child.packageName,
            child.version
          );
        }
      }
    } else {
      // 扁平化安装
      flatDependencies[depName] = child.version;
      installPackage(child.packageName, child.version);
      // 递归处理子依赖
      flattenAndInstall(child, flatDependencies, parent);
    }
  });
}

function installPackage(packageName, version) {
  // 模拟安装逻辑
  console.log(`Installing ${packageName}@${version}`);
  return { name: packageName, version: version, node_modules: {} };
}

// 运行示例
const packageJson = {
  name: "my-app",
  version: "1.0.0",
  dependencies: {
    dep1: "^1.0.0",
    dep2: "^2.0.0",
  },
};
const depTree = buildDependencyTree(packageJson);
console.log("depTree", depTree);
const finalResult = flattenAndInstall(depTree);
console.log("finalResult==>", finalResult);
