import React from 'react'
import { StyleNameProduct, WrapperCardStyle, WrapperDiscountText, WrapperPriceText, WrapperReportText, WrapperStyleTextSell } from './style'
import { StarFilled } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { convertPrice } from '../../utils'

const CardComponent = (props) => {
    const {countInStock, description, image, name, price, rating, type, discount, selled, id} = props
    const navigate = useNavigate()
    const handleDetailsProduct = (id) => {
        navigate(`/product-details/${id}`)
    }
  return (
    <WrapperCardStyle
        hoverable
        style={{ width: 200 }}
        styles={ {body:{ padding: '10px'}}}
        cover={<img alt="example" src={image} />}
        onClick={() => handleDetailsProduct(id)}
    >
        <StyleNameProduct>{name}</StyleNameProduct>
        <WrapperReportText>
            <span style={{ marginRight: '4px'}}>
                <span>{rating}</span><StarFilled style={{ fontSize: '12px', color: 'rgb(255,215,0)' }} />
            </span>
            <WrapperStyleTextSell> | Còn {countInStock} | Đã bán {selled || 0}</WrapperStyleTextSell>
        </WrapperReportText>
        <WrapperPriceText>
            <span style={{ marginRight: '8px'}}>{convertPrice(price)}</span>
            <WrapperDiscountText>
                -{discount || 5} %
            </WrapperDiscountText>
        </WrapperPriceText>
    </WrapperCardStyle>
  )
}

export default CardComponent
