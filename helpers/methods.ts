export function capitalizeFirstLetter(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}


const iconMap: { [key: string]: string } = {
	house: "/images/icons8-house-96.png",
	food: "/images/icons8-hamburger-96.png",
	travel: "/images/icons8-beach-96.png",
	default: "/images/icons8-question-mark-96.png",
};
export function getCatogoryIcon(category: string){
	return category in iconMap ? iconMap[category] : iconMap.default
}