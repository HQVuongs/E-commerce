import { Card } from "antd";
import styled from "styled-components";

export const WrapperCardStyle = styled(Card)`
    width: 200px;
    & img {
        height: 200px;
        width: 200px;
    }
    position: relative;
    background-color: ${props => props.disabled ? "#ccc" : "#fff"}
    cursor: ${props => props.disabled ? "not-allowed" : "pointer"}
`

export const StyleNameProduct = styled.div`
    font-weight: 400;
    font-size: 13px;
    line-height: 16px;
    color: #666;
`

export const WrapperReportText = styled.div`
    font-size: 11px;
    color: rbg(128, 128, 137);
    display: flex;
    align-items: center;
    margin: 6px 0 0;
`

export const WrapperPriceText = styled.div`
    color: #c00;
    font-size: 16px;
    line-height: 22px;
    margin-right: 5px;
    font-weight: bold;
`
export const WrapperDiscountText = styled.span`
    color: rgb(204, 0, 0);
    font-size: 12px;
    line-height: 22px;
    margin-right: 5px;
    font-weight: bold;
`
export const WrapperStyleTextSell = styled.span`
    font-size: 15px;
    line-height: 24px;
    color: rgb(120, 120, 120);
`