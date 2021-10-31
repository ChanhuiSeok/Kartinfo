import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { ChannelType } from "../metadata/channelType";
import { getChannelName } from "./util";

const Channel = styled.span`
  align-self: center;
  border-radius: 5px;
  padding: 6px;
  color: white;
  font-weight: 600;
  margin: 5px;
  font-size: 14px;
  @media (max-width: 700px) {
    font-weight: 500;
    font-size: 11px;
    margin: 2px;
    padding: 4px;
  }
`;

interface Props {
  channelName: ChannelType;
}

const ChannelTag: FunctionComponent<Props> = ({ channelName }) => {
  const { name, color } = getChannelName(channelName);

  return <Channel style={{ backgroundColor: `${color}` }}>{name}</Channel>;
};

export default ChannelTag;
