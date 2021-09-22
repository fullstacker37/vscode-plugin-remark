// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('祝贺, 您的插件现在已经被激活!');
	
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.remark', function () {
		const worksapceInfo = vscode.workspace.workspaceFolders;
		// 工作区打开的文件夹根目录绝对路径
		const workspacePath = worksapceInfo && Array.isArray(worksapceInfo) && worksapceInfo[0].uri.path;
		// console.log('vscode === ', vscode.workspace.workspaceFolders);
		// The code you place here will be executed every time your command is executed
		// console.log('arguments: ', arguments);
		const args = Array.from(arguments);
		// 右键选中文件或文件夹的绝对路径
		let filePath = args.length && args[0].path;
		// 需要记录的文件或文件夹匹配掉工作区路径的绝对路径
		let absolutePath = '';
		if (workspacePath && filePath) {
			absolutePath = filePath.replace(workspacePath, '');
			// console.log('绝对路径：：：', absolutePath);
		}
		// Display a message box to the user
		vscode.window.showInformationMessage('可以开启您的文件(夹)备注之旅了!');
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {
	console.log('您的插件 vscode-plugin-remark 已被释放');
}

module.exports = {
	activate,
	deactivate
}
