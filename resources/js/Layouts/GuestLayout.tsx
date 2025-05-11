import QueaterLogo from '@/Components/QueaterLogo';
import { PropsWithChildren } from 'react';
import CoffeeShop from '@/Components/Svg/CoffeeShop';
import Qr from '@/Components/Icons/Qr';
import CreditCard from '@/Components/Icons/CreditCard';
import HourGlass from '@/Components/Icons/HourGlass';

export default function Guest({ children }: PropsWithChildren) {
	return (
		<div className="flex flex-col-reverse  lg:flex-row bg-gray-50 overflow-hidden">
			{/* Panel izquierdo con información y gráficos */}
			<div className="w-full lg:w-[60dvw] flex flex-col justify-center px-6 lg:px-12 bg-white rounded-xl shadow-lg lg:m-6 py-10">
				<div className="flex flex-col items-center max-w-[600px] mx-auto">
					{/* Sección de headlines */}
					<div className="w-full flex flex-col gap-6">
						<div className="flex gap-6 items-center">
							<QueaterLogo />
							<h1 className="text-3xl lg:text-4xl font-bold text-orange-600">Queater</h1>
						</div>
						<div className="flex gap-6">
							<p className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800">Rápido</p>
							<p className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800">Intuitivo</p>
							<p className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800">Eficiente</p>
						</div>
						<p className="text-base md:text-lg text-gray-600 w-64 md:w-full mb-4">
							Optimiza el servicio en tu restaurante, reduce la carga de trabajo de tus camareros y brinda mayor autonomía a tus clientes.
						</p>
					</div>

					{/* Imagen principal */}
					<div className="w-full">
						<CoffeeShop className="p-6 mb-8 md:w-[500px] w-[350px]   mx-auto" />

						{/* Características */}
						<div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 ">
							<div className="rounded-lg flex flex-col items-center text-center ">
								<div className="bg-orange-100 p-3 rounded-md mb-3">
									<Qr className="w-12 h-12 text-orange-600" />
								</div>
								<h3 className="font-medium text-gray-800">Pedidos por QR</h3>
								<p className="text-sm text-gray-600">Escanea y pide sin esperas</p>
							</div>

							<div className="rounded-lg flex flex-col items-center text-center ">
								<div className="bg-orange-100 p-3 rounded-md mb-3">
									<CreditCard className="w-12 h-12 text-orange-600" />
								</div>
								<h3 className="font-medium text-gray-800">Pago en línea</h3>
								<p className="text-sm text-gray-600">Métodos de pago seguros</p>
							</div>

							<div className="rounded-lg flex flex-col items-center text-center ">
								<div className="bg-orange-100 p-3 rounded-md mb-3">
									<HourGlass className="w-12 h-12 text-orange-600" />
								</div>
								<h3 className="font-medium text-gray-800">Ahorro de tiempo</h3>
								<p className="text-sm text-gray-600">Para clientes y personal</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Panel derecho con el formulario */}
			<div className="flex items-center justify-center w-full lg:w-[40dvw] overflow-hidden h-auto lg:h-[100dvh] px-6 py-8 lg:py-4 relative">
				{/* Contenedor del formulario */}
				<div className="w-full max-w-[85%] flex  flex-col justify-center">
					{children}

					<div className="mt-8 pt-6">
						<p className="text-sm text-center text-gray-500">©2025 Queater. Todos los derechos reservados.</p>
					</div>
				</div>
			</div>
		</div>
	);
}
