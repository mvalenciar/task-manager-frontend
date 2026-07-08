interface CustomHeaderProps {
	title: string;
	description: string;
}

const CustomHeader = ({ title, description }: CustomHeaderProps) => {
	return (
		<div className="w-ful flex flex-col gap-2">
			<h1 className="text-4xl uppercase font-bold">{title}</h1>
			<p>{description}</p>
		</div>
	);
};

export default CustomHeader;
