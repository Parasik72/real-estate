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
}

export const PropertyCard: FC<IProps> = ({
    address,
    imgPath,
    price,
    title,
    className
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
      </div>
    </Link>
)