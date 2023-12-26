import { ArrowIcon } from "@/common/icons/arrow.icon"
import { PropertyModel } from "@/common/services/property/property.model";
import { PropertyCard } from "../property-card.component";
import { RootState } from "@/common/store/root.reducer";
import { Entity } from "@/common/store/types/store.types";
import { PropertyImageModel } from "@/common/services/property/property-image.model";
import { connect } from "react-redux";
import { useRef, useState } from "react";

interface IState {
  properties: PropertyModel[];
  propertyImages: Entity<PropertyImageModel>;
}

function mapStateToProps(state: RootState): IState {
  const properties = state.properties;
  const propertyImages = state.propertyImages;
  return { 
    properties: properties ? Object.values(properties) : [],
    propertyImages
  };
}

function PropertyContainerComponent({ properties, propertyImages }: IState) {
  const MAX_OFFSET = 4;
  const [offset, setOffset] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const onChangeOffset = (newValue: number) => {
    setOffset(newValue);
    const normalize = newValue / MAX_OFFSET;
    const scrollWidth = scrollRef.current?.scrollWidth || 1;
    const clientWidth = scrollRef.current?.clientWidth || 1;
    const scrollLeft = normalize * (scrollWidth - clientWidth);
    scrollRef.current?.scroll({ left: scrollLeft });
  }
  return (
    <>
      <div className="mt-16 sm:mt-4 flex gap-5 justify-center items-center">
        <div className="hidden sm:block w-full h-2px bg-indigo-100">
          <div className={'h-2px bg-blue-900'} style={{ width: `${offset * (100 / MAX_OFFSET)}%` }}></div>
        </div>
        <div className="flex gap-5">
          <button 
            disabled={offset <= 0}
            onClick={() => onChangeOffset(offset - 1)} 
            className="bg-blue-900 disabled:bg-indigo-100 rounded-full px-6 py-5"
          >
            <ArrowIcon reverse />
          </button>
          <button
            disabled={offset >= MAX_OFFSET}
            onClick={() => onChangeOffset(offset + 1)} 
            className="bg-blue-900 disabled:bg-indigo-100 rounded-full px-6 py-5"
          >
            <ArrowIcon />
          </button>
        </div>
      </div>
      <div ref={scrollRef} className="flex gap-5 mt-6 scroll-smooth overflow-x-hidden">
        {properties.map((property) => (
          <div key={property.propertyId} className="w-full flex-shrink-0 max-w-250px md:max-w-350px">
            <PropertyCard 
              property={property}
              propertyImages={propertyImages}
              className="max-w-250px md:max-w-350px"
            />
          </div>
        ))}
      </div>
    </>
  );
}

export const PropertyContainer = connect(mapStateToProps, null)(PropertyContainerComponent);
