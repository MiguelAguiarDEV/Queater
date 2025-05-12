import QueaterLogo from '@/Components/QueaterLogo';
import { PropsWithChildren } from 'react';
import CoffeeShop from '@/Components/Svg/CoffeeShop';
import Qr from '@/Components/Icons/Qr';
import CreditCard from '@/Components/Icons/CreditCard';
import HourGlass from '@/Components/Icons/HourGlass';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex flex-col-reverse overflow-hidden bg-gray-50 lg:flex-row">
            {/* Panel izquierdo con información y gráficos */}
            <div className="flex w-full flex-col justify-center rounded-xl bg-white px-6 py-10 shadow-lg lg:m-6 lg:w-[60dvw] lg:px-12">
                <div className="mx-auto flex max-w-[600px] flex-col items-center">
                    {/* Sección de headlines */}
                    <div className="flex w-full flex-col gap-6">
                        <div className="flex items-center gap-6">
                            <QueaterLogo />
                            <h1 className="text-3xl font-bold text-orange-600 lg:text-4xl">
                                Queater
                            </h1>
                        </div>
                        <div className="flex gap-6">
                            <p className="text-xl font-semibold text-gray-800 sm:text-2xl lg:text-3xl">
                                Rápido
                            </p>
                            <p className="text-xl font-semibold text-gray-800 sm:text-2xl lg:text-3xl">
                                Intuitivo
                            </p>
                            <p className="text-xl font-semibold text-gray-800 sm:text-2xl lg:text-3xl">
                                Eficiente
                            </p>
                        </div>
                        <p className="mb-4 w-64 text-base text-gray-600 md:w-full md:text-lg">
                            Optimiza el servicio en tu restaurante, reduce la
                            carga de trabajo de tus camareros y brinda mayor
                            autonomía a tus clientes.
                        </p>
                    </div>

                    {/* Imagen principal */}
                    <div className="w-full">
                        <CoffeeShop className="mx-auto mb-8 w-[350px] p-6 md:w-[500px]" />

                        {/* Características */}
                        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
                            <div className="flex flex-col items-center rounded-lg text-center">
                                <div className="mb-3 rounded-md bg-orange-100 p-3">
                                    <Qr className="h-12 w-12 text-orange-600" />
                                </div>
                                <h3 className="font-medium text-gray-800">
                                    Pedidos por QR
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Escanea y pide sin esperas
                                </p>
                            </div>

                            <div className="flex flex-col items-center rounded-lg text-center">
                                <div className="mb-3 rounded-md bg-orange-100 p-3">
                                    <CreditCard className="h-12 w-12 text-orange-600" />
                                </div>
                                <h3 className="font-medium text-gray-800">
                                    Pago en línea
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Métodos de pago seguros
                                </p>
                            </div>

                            <div className="flex flex-col items-center rounded-lg text-center">
                                <div className="mb-3 rounded-md bg-orange-100 p-3">
                                    <HourGlass className="h-12 w-12 text-orange-600" />
                                </div>
                                <h3 className="font-medium text-gray-800">
                                    Ahorro de tiempo
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Para clientes y personal
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Panel derecho con el formulario */}
            <div className="relative flex h-auto w-full items-center justify-center overflow-hidden px-6 py-8 lg:h-[100dvh] lg:w-[40dvw] lg:py-4">
                {/* Contenedor del formulario */}
                <div className="flex w-full max-w-[85%] flex-col justify-center">
                    {children}

                    <div className="mt-8 pt-6">
                        <p className="text-center text-sm text-gray-500">
                            ©2025 Queater. Todos los derechos reservados.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
