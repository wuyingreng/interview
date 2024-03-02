// 链表节点
class ListNode {
	constructor(value) {
		this.value = value;
		this.next = null;
	}
}

// 链表
class LinkedList {
	constructor() {
		this.head = null;
		this.tail = null;
	}

	// 添加元素到链表末尾
	append(value) {
		const newNode = new ListNode(value);
		if (!this.head) {
			this.head = newNode;
			this.tail = newNode;
		} else {
			this.tail.next = newNode;
			this.tail = newNode;
		}
	}

	// 计算链表长度
	length() {
		let count = 0;
		let currentNode = this.head;
		while (currentNode) {
			count++;
			currentNode = currentNode.next;
		}
		return count;
	}

	// 查找元素，返回第一个匹配的节点
	find(value) {
		let currentNode = this.head;
		while (currentNode) {
			if (currentNode.value === value) {
				return currentNode;
			}
			currentNode = currentNode.next;
		}
		return null;
	}

	// 在链表中插入元素
	insert(value, afterValue) {
		const newNode = new ListNode(value);
		if (!this.head) {
			this.head = newNode;
			this.tail = newNode;
			return;
		}

		const afterNode = this.find(afterValue);
		if (afterNode) {
			newNode.next = afterNode.next;
			afterNode.next = newNode;
			if (afterNode === this.tail) {
				this.tail = newNode;
			}
		}
	}

	// 删除元素
	remove(value) {
		if (!this.head) {
			return;
		}

		// 如果要删除的是头节点
		if (this.head.value === value) {
			this.head = this.head.next;
			if (this.head === null) {
				this.tail = null;
			}
			return;
		}

		let currentNode = this.head;
		while (currentNode.next) {
			if (currentNode.next.value === value) {
				currentNode.next = currentNode.next.next;
				if (currentNode.next === null) {
					this.tail = currentNode;
				}
				return;
			}
			currentNode = currentNode.next;
		}
	}

	// 更改链表中的元素
	update(oldValue, newValue) {
		let currentNode = this.head;
		while (currentNode) {
			if (currentNode.value === oldValue) {
				currentNode.value = newValue;
				return;
			}
			currentNode = currentNode.next;
		}
	}

	// 打印链表
	print() {
		let currentNode = this.head;
		let output = '';
		while (currentNode) {
			output += currentNode.value + (currentNode.next ? ' -> ' : '');
			currentNode = currentNode.next;
		}
		console.log(output);
	}

	// ... 其他增删改查方法 ...
}

const list = new LinkedList();
list.append(1);
list.append(2);
list.append(3);
console.log("Length:", list.length()); // 输出：Length: 3
list.insert(4, 2); // 在值为2的节点后插入值为4的节点
list.print(); // 输出：1 -> 2 -> 4 -> 3
list.remove(1); // 删除值为1的节点
list.print(); // 输出：2 -> 4 -> 3
list.update(4, 5); // 更改值为4的节点为值为5的节点
list.print(); // 输出：2 -> 5 -> 3
console.log("Find:", list.find(5)); // 输出：Find: ListNode { value: 5, next: ListNode { value: 3, next: null } }
