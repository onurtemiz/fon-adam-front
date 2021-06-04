import styled from 'styled-components/macro';
import { Avatar } from 'antd';

export default styled.div`
  display: flex;
  align-items: center;
  position: relative;

  border-top: 1px solid #bcc4d2;

  &:last-child {
    border-bottom: 1px solid #bcc4d2;
  }

  padding: 10px 15px;

  &:hover {
    background-color: #d9def5;
  }
`;

export const Strip = styled.div`
  background-color: ${(p) => p.color};

  position: absolute;
  top: 0px;
  left: 0;
  width: 4px;
  height: 60px;
  pointer-events: none;
`;

export const StyledAvatar = styled(Avatar)`
  border-radius: 8px;

  margin-right: 8px;
  background-color: ${(p) => p.color};

  width: 36px;
  height: 36px;
  line-height: 36px;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
`;

export const Code = styled.span`
  font-size: 12px;
  color: #606c82;
`;

export const Name = styled.span`
  max-width: 350px;
  width: 100%;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* number of lines to show */
  -webkit-box-orient: vertical;
`;

export const Piece = styled.span``;
export const Price = styled.span``;
export const DateAdded = styled.span``;

export const InsideWrapper = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
`;
