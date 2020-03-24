const test = require("ava")
const neatTap = require(".")

const tapData = `
1..4
ok 1 - A
not ok 2 - B
ok 3 - C
not ok 4 - D
`

test("main", async (t) => {
	t.deepEqual(await neatTap(tapData), {
		ok: false,
		count: 4,
		pass: 2,
		fail: 2,
		bailout: false,
		todo: 0,
		skip: 0,
		plan: { start: 1, end: 4, skipAll: false, skipReason: "", comment: "" },
		failures: [
			{ ok: false, id: 2, name: "B", fullname: "" },
			{ ok: false, id: 4, name: "D", fullname: "" },
		],
		time: null,
		passes: [
			{ ok: true, id: 1, name: "A", fullname: "" },
			{ ok: true, id: 3, name: "C", fullname: "" },
		],
		assertions: [
			{ ok: true, id: 1, name: "A", fullname: "" },
			{ ok: false, id: 2, name: "B", fullname: "" },
			{ ok: true, id: 3, name: "C", fullname: "" },
			{ ok: false, id: 4, name: "D", fullname: "" },
		],
	})
})
