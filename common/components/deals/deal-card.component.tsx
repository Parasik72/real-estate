import clsx from "clsx";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { FC } from "react";

interface IProps {
    title: string;
    price: number;
    address: string;
    imgPath: StaticImageData;
    className?: string;
    displaySignBtn?: boolean;
    displayCancelBtn?: boolean;
}

export const DealCard: FC<IProps> = ({
    address,
    imgPath,
    price,
    title,
    className,
    displaySignBtn,
    displayCancelBtn
}) => (
    <Link href="/offers/1" className={clsx("block bg-white shadow-lg rounded-md w-full flex-shrink-0", className)}>
      <Image className="bg-indigo-50 w-full object-cover object-center rounded-md" src={imgPath} alt={title} height={249} width={444} />
      <div className="p-4 flex flex-col gap-4">
        <h3 className="text-dark-blue text-1.5xl leading-8 font-bold">
          {title}
        </h3>
        <div className="flex flex-col gap-1">
          <span className="font-bold text-blue-900">{price}$</span>
          <span className="text-dark-blue">{address}</span>
        </div>
        <h4 className="text-dark-blue">
            <span className="font-bold">Seller: </span>
            haylie.donin@realestate.es
        </h4>
        <h4 className="text-dark-blue">
            <span className="font-bold">Buyer: </span>
            <span>john.doe@realestate.es </span>
            <span className="font-bold">(YOU)</span>
        </h4>
        {displaySignBtn && (
            <button className="px-6 py-2 text-white bg-blue-900 rounded-md font-bold">
                Sign the deal
            </button>
        )}
        {displayCancelBtn && (
            <button className="px-6 py-2 text-white bg-red-900 rounded-md font-bold">
                Cancel the deal
            </button>
        )}
      </div>
    </Link>
)