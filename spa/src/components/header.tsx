import Logo from "./logo";

export default function Header() {
	return (
		<div className="flex flex-col justify-center items-center bg-orange-200 p-4 rounded-lg w-full">
			<Logo />
		</div>
	);
}
