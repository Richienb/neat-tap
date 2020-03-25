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
		version: undefined,
		ok: false,
		stats: {
			bailout: false,
			todo: 0,
			skip: 0,
			time: undefined,
			total: 4,
			passes: 2,
			failures: 2,
		},
		plan: { start: 1, end: 4, skipAll: false, skipReason: "", comment: "" },
		assertions: [
			{
				id: 1,
				comment: undefined,
				name: "A",
				ok: true,
				skipped: false,
				skipReason: undefined,
				todo: undefined,
				time: undefined,
				extra: undefined,
			},
			{
				id: 2,
				comment: undefined,
				name: "B",
				ok: false,
				skipped: false,
				skipReason: undefined,
				todo: undefined,
				time: undefined,
				extra: undefined,
			},
			{
				id: 3,
				comment: undefined,
				name: "C",
				ok: true,
				skipped: false,
				skipReason: undefined,
				todo: undefined,
				time: undefined,
				extra: undefined,
			},
			{
				id: 4,
				comment: undefined,
				name: "D",
				ok: false,
				skipped: false,
				skipReason: undefined,
				hasTodo: false,
				todo: undefined,
				time: undefined,
				extra: undefined,
			},
		],
	})
})
