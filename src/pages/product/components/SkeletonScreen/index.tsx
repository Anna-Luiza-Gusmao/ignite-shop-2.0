import { ImageContainer, ProductContainer, ProductDetails } from "./styles"

export default function SkeletonScreen () {
    return (
        <ProductContainer>
            <ImageContainer />
            <ProductDetails>
                <h1></h1>
                <span></span>
                <p></p>
                <button></button>
            </ProductDetails>
        </ProductContainer>
    )
}