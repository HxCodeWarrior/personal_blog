import { createGlobalStyle } from 'styled-components'

export const DocumentStyles = createGlobalStyle`
  .skip-link {
    position: absolute;
    left: -9999px;
    top: auto;
    width: 1px;
    height: 1px;
    overflow: hidden;

    &:focus {
      position: fixed;
      top: 0;
      left: 0;
      width: auto;
      height: auto;
      padding: 20px;
      background: #FFFFFF;
      z-index: 9999;
    }
  }

  .noscript-warning {
    padding: 20px;
    margin: 20px;
    text-align: center;
    background-color: #FEF2F2;
    color: #991B1B;
    border-radius: 8px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);

    h2 {
      margin-bottom: 10px;
    }
  }
` 