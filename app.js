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

const makeTargetWhite = (target, name) => {
	target.classList.add('active');

	timeframeParagraph.forEach(item => {
		if (item.getAttribute('timeframeValue') !== name) {
			item.classList.remove('active');
		}
	});
};

const addHoursTextInDom = (DOMItems, data, timeframe, hoursType) => {
	DOMItems.forEach((item, index) => {
		const hours = data[index].timeframes[timeframe][hoursType];
		const concatenationText = item.tagName === 'P' ? 'Last Week - ' : '';

		item.textContent = `${concatenationText}${hours}hrs`;
	});
};

const addDataInDom = (data, timeframe) => {
	addHoursTextInDom(hoursH3, data, timeframe, 'current');
	addHoursTextInDom(lastWeekHoursParagraph, data, timeframe, 'previous');
};

const actions = {
	async clickTimeFrame(target) {
		const timeframe = target.getAttribute('timeframeValue');
		const data = await getData();

		makeTargetWhite(target, timeframe);
		addDataInDom(data, timeframe);
	},
};

const accessActions = target => {
	const nameFunction = target.getAttribute('data-js');

	const func = actions[nameFunction];
	func?.(target);
};

actions.clickTimeFrame(daily);
main.addEventListener('click', e => accessActions(e.target));
