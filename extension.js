// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs/promises');
const path = require('path');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('祝贺, 您的插件现在已经被激活!');
	
	// 步骤一：获取需要添加备注的文件或文件夹绝对路径
	const worksapceInfo = vscode.workspace.workspaceFolders;
	// 工作区打开的文件夹根目录绝对路径
	const workspacePath = worksapceInfo && Array.isArray(worksapceInfo) && worksapceInfo[0].uri.path;
	console.log('worksapceInfo === ', worksapceInfo);

	// 步骤二：判断是否存在 .remark.json 文件（无则创建，有则读取内容给文件添加备注信息）
	// const remarkFilePath = path.join(workspacePath, './.settings/.remark');
	const remarkFilePath = path.join(workspacePath, './.settings/.remark.json');
	// console.log(`>>>>>${remarkFilePath}<<<<<`)
	fs.readFile(remarkFilePath)
		.then(data => {
			console.log('读取到文件内容：', data);
		})
		.catch(() => {
			fs.writeFile(remarkFilePath, '{}')
				.then(res => {
					console.log('写入文件成功');
				})
				.catch(err => {
					console.log('写入文件失败');
				})
		})
	
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.remark', function () {
		// The code you place here will be executed every time your command is executed

		// 步骤三：给文件/夹添加备注信息
		// console.log('arguments: ', arguments);
		const args = Array.from(arguments);
		// 右键选中文件或文件夹的绝对路径
		let filePath = args.length && args[0].path;
		// 需要记录的文件或文件夹匹配掉工作区路径的绝对路径
		let absolutePath = '';
		if (filePath) {
			absolutePath = filePath.replace(workspacePath, '');
			console.log('绝对路径：：：', absolutePath);
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
