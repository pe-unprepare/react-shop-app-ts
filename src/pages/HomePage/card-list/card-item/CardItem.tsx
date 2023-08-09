import React, { FC } from "react";
import styles from "./CardItem.module.scss";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../../hooks/redux";
import { useAppDispatch } from "../../../../hooks/redux";
import { addToCart } from "../../../../store/cart/cart.slice";
import { IProduct } from "../../../../store/products/products.type";

type CardItemProps = {
  item: IProduct;
};

const CardItem: FC<CardItemProps> = ({ item }) => {
  const { products } = useAppSelector((state) => state.cartSlice);
  // 주어진 판별 함수를 적어도 하나라도 통과하는지 테스트.
  // 함수가 true 값을 반환하면 true를 반환, 그렇지 않으면 false
  const productsMatching = products.some((product) => product.id === item.id);
  const dispatch = useAppDispatch();

  const addItemToCart = () => {
    dispatch(addToCart(item));
  };

  return (
    <li className={styles.card_item}>
      <Link to={`/product/${item.id}`}>
        <img
          src={item.image}
          width={"80%"}
          height={"200px"}
          alt="product card"
        />
      </Link>

      <h5>{item.title.substring(0, 15)}...</h5>

      <div>
        <button
          disabled={productsMatching}
          onClick={() => !productsMatching && addItemToCart()}
        >
          {productsMatching ? "장바구니에 담긴 제품" : "장바구니에 담기"}
        </button>
        <p>$ {item.price}</p>
      </div>
    </li>
  );
};

export default CardItem;
