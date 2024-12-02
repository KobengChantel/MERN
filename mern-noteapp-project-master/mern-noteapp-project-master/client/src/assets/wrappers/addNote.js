import styled from "styled-components"

const Wrapper = styled.section`
  border-radius: var(--borderRadius);
  width: 100%;
  margin: auto;
  background: var(--rose-100);
  padding: 3rem 2rem 4rem;
  box-shadow: var(--shadow-2);
  h3 {
    margin-top: 0;
  }
  .form {
    background-color: var(--rose-100);
    margin: auto;
    border-radius: 5px;
    box-shadow: none;
    padding: 1rem;
    max-width: 100%;
    width: 100%;
  }
  .form-textarea {
    resize: none;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    grid-template-columns: 1fr 1fr;
    align-items: center;
    column-gap: 1rem;
  }
  .form-center button {
    align-self: end;
    height: 35px;
    margin-top: 1rem;
  }
  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    align-self: flex-end;
    margin-top: 0.5rem;
    button {
      height: 35px;
    }
  }
  .clear-btn {
    background: var(--grey-500);
  }
  .clear-btn:hover {
    background: var(--black);
  }
  @media (min-width: 992px) {
    width: 60%;
    .form {
      max-width: 90%;
      width: 90%;
    }
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }
    .btn-container {
      margin-top: 0;
    }
  }
  @media (min-width: 1120px) {
    width: 60%;
    .form {
      max-width: 80%;
      width: 80%;
    }
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .form-center button {
      margin-top: 0;
    }
  }
`

export default Wrapper
