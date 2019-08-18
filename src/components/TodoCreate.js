import React, { useState } from "react";
import styled, { css } from "styled-components";
import { MdAdd } from "react-icons/md";
import { darken, lighten } from "polished";
import { useTodoNextId, useTodoDispatch } from "./TodoContext";

const CircleButton = styled.button`
  background: #38d9a9;
  &:hover {
    background: ${lighten(0.2, "#38d9a9")};
  }

  &:active {
    background: ${darken(0.2, "#38d9a9")};
  }

  z-index: 5;
  cursor: pointer;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  left: 50%;
  bottom: 0px;
  transform: translate(-50%, 50%);
  font-size: 60px;
  color: white;
  border-radius: 40px;
  border: none;
  outline: none;

  transition: 0.125s all ease-in;

  ${props =>
    props.open &&
    css`
      background: #ff6b6b;
      &:hover {
        background: ${lighten(0.2, "#ff6b6b")};
      }
      &:active {
        background: ${darken(0.2, "#ff6b6b")};
      }
      transform: translate(-50%, 50%) rotate(45deg);
    `}
`;

const InsertFormPositioner = styled.div`
  width: 100%;
  bottom: 0;
  left: 0;
  position: absolute;
`;

const InsertForm = styled.form`
  background: #f8f9fa;
  padding: 32px;
  padding-bottom: 72px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  border-top: 1px solid #e9ecdf;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #f03e3e;
  width: 100%;
  outline: none;
  font-size: 18px;
  box-sizing: border-box;
`;

function TodoCreate() {
  const [open, setOpen] = useState(false);
  const onToggle = () => setOpen(!open);
  const [value, setValue] = useState("");

  const nextId = useTodoNextId();
  const dispatch = useTodoDispatch();

  const onChange = e => setValue(e.target.value);
  const onSubmit = e => {
    e.preventDefault();
    dispatch({
      type: "CREATE",
      todo: {
        id: nextId.current,
        text: value,
        done: false
      }
    });
    setValue("");
    setOpen(!open);
    nextId.current += 1;
  }; //양식 제출 후 새로고침 방지

  return (
    <>
      {open && (
        <InsertFormPositioner>
          <InsertForm onSubmit={onSubmit}>
            <Input
              onChange={onChange}
              value={value}
              placeholder="할 일을 입력 후, Enter를 누르세요"
              autoFocus
            />
          </InsertForm>
        </InsertFormPositioner>
      )}
      <CircleButton open={open} onClick={onToggle}>
        <MdAdd />
      </CircleButton>
    </>
  );
}

export default TodoCreate;
