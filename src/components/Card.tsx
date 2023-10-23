import React from "react";
import { Card as CardProp } from "utils/types";
import placeholder from "assets/img/empty-img.png";
import { Tag } from "rsuite";

const Card: React.FC<CardProp> = ({ item, category }) => {
  return (
    <>
      <div className="product-card">
        <p className="product-card__image">
          {item.image && item.image != "" ? (
            <img src={item.image} alt="Product Image" />
           ) : (
            <img src={placeholder} alt="Placeholder" />
          )}
        </p>
        <div className="product-card__body">
          <h6 className="ellipsis">{item.name}</h6>
          <div className="">
            <span className="">{item.price} JD</span>
          </div>
          <div className="product-card__labels">
            <Tag color="cyan" className="m-0">{category.name}</Tag>
            {item.is_available ?
            <Tag color="green" className="m-0">متوفر</Tag>
            :
            <Tag color="red" className="m-0">غير متوفر</Tag>
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
