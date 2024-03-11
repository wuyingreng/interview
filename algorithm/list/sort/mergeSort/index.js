// 使用类定义 ListNode
class ListNode {
	constructor(val, next) {
		this.val = (val === undefined ? 0 : val);
		this.next = (next === undefined ? null : next);
	}
}

// 使用箭头函数定义 mergeTwoLists 函数
const mergeTwoLists = (l1, l2) => {
	// 第一个0去哪里了？？好奇怪啊。答案在后面
	let sentinel = new ListNode(0);
	let current = sentinel;

	while (l1 !== null && l2 !== null) {
		if (l1.val < l2.val) {
			current.next = l1;
			l1 = l1.next;
		} else {
			current.next = l2;
			l2 = l2.next;
		}
		current = current.next;
	}

	current.next = (l1 === null) ? l2 : l1;
	// 0 不用，所以取next
	console.log('sentinel.next==>', sentinel, sentinel.next);
	return sentinel.next;
};

// 示例用法
let l1 = new ListNode(1, new ListNode(2, new ListNode(4)));
let l2 = new ListNode(1, new ListNode(3, new ListNode(4)));

let mergedList = mergeTwoLists(l1, l2);
console.log('mergedList==>', mergedList);

// 下面的代码只是帮助看清楚mergedList的内容的。mergedList的已经是链表了。
while (mergedList) {
	console.log(mergedList.val);
	mergedList = mergedList.next;
}
