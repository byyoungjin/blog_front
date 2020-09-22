const bp = {
  small: "600px",
  medium: "768px",
  large: "992px",
  xlarge: "1200px"
};

const onMedium = css => `
  @media(min-width:${bp.medium}) {
    ${css}
  }
`;

const onLarge = css => `
@media(min-width:${bp.large}){
  ${css}
}
`;

const onXLarge = css => `
@media(min-width:${bp.xlarge}){
  ${css}
}
`;

export default { bp, onMedium, onLarge, onXLarge };
