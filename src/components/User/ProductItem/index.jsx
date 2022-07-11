import { Row, Rate } from "antd";
import { SearchOutlined, HeartOutlined } from "@ant-design/icons";
import history from "../../../utils/history";
import BtnAddToCart from "../BtnAddToCart";
import "./styles.scss";

function ProductItem(props) {
  const { id, name, discount, isNew, imgs, price, rate, alt } = props.product;

  return (
    <div className="product-item">
      <div className="product-item__img">
        <img
          src={imgs[0]}
          alt={alt}
          onClick={() => history.push(`/product-detail/${id}`)}
        />
        {discount > 0 ? (
          <div className="product-item__img--discount"> {`${discount}%`}</div>
        ) : (
          ""
        )}
        {isNew ? <div className="product-item__img--new"> New </div> : ""}
        <ul className="product-item__toolbox">
          <li>
            <HeartOutlined />
          </li>
          <BtnAddToCart product={{ ...props.product }} />
          <li onClick={() => history.push(`/product-detail/${id}`)}>
            <SearchOutlined />
          </li>
        </ul>
      </div>
      <div className="product-item__content">
        <h3 className="product-item__content--name">{name}</h3>
        <Row>
          <Rate disabled defaultValue={rate} />
          <span className="product-item__comment">0 comments</span>
        </Row>
        <p className="product-item__content--price">{`$${price}`}</p>
      </div>
    </div>
  );
}

export default ProductItem;
