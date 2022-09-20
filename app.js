const main = document.querySelector('[data-js="main"]');
const hoursH3 = Array.from(main.querySelectorAll('[data-js="hoursH3"]'));

const lastWeekHoursParagraph = Array.from(
	main.querySelectorAll('[data-js="lastWeekHoursParagraph"]')
);
const timeframeParagraph = Array.from(
	main.querySelectorAll('[data-js="clickTimeFrame"]')
);

const [daily] = timeframeParagraph;
const url = './data.json';

const getData = async () => {
	const response = await fetch(url);
	const data = await response.json();
	return data;
};

const turnWhite = (target, name) => {
	target.classList.add('active');

	timeframeParagraph.forEach(item => {
		if (item.getAttribute('timeframeValue') !== name) {
			item.classList.remove('active');
		}
	});
};

const executeForEachInDOMItems = (DOMItems, data, timeframe, hoursType) => {
	DOMItems.forEach((item, index) => {
		const hours = data[index].timeframes[timeframe][hoursType];
		const text = item.tagName === 'P' ? 'Last Week - ' : '';
		item.textContent = `${text}${hours}hrs`;
	});
};

const addDataInDom = (data, timeframe) => {
	executeForEachInDOMItems(hoursH3, data, timeframe, 'current');
	executeForEachInDOMItems(lastWeekHoursParagraph, data, timeframe, 'previous');
};

const actions = {
	async clickTimeFrame(target) {
		const timeframe = target.getAttribute('timeframeValue');
		const data = await getData();

		turnWhite(target, timeframe);
		addDataInDom(data, timeframe);
	},
};

const accessActions = target => {
	const nameFunction = target.getAttribute('data-js');

	const func = actions[nameFunction];
	func?.call(actions, target);
};

actions.clickTimeFrame(daily);
main.addEventListener('click', e => accessActions(e.target));
