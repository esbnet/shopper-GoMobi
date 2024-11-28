export default function Logo() {
	return (
		<div className="flex flex-col justify-center items-center bg-orange-100 p-4 rounded-md w-full h-full">
			<div className="flex flex-col justify-center items-center bg-orange-500 shadow-2xl mb-4 rounded-full w-28 h-28 outline outline-1 outline-offset-2 outline-orange-300">
				<p className="z-10 font-audiowide font-extrabold text-4xl text-white">
					Go
				</p>
				{/* <FaCar size={60} className="z-0 absolute mt-8" /> */}
			</div>
			<h1 className="font-audiowide font-extrabold text-4xl">
				<span className="text-orange-600">Go</span>
				<span className="text-slate-800">Mobi</span>
			</h1>
			<p className="-mt-1 mb-2 text-slate-600 text-xs tracking-wider shink">
				seu destino, nossa prioridade
			</p>
		</div>
	);
}
