import {FC} from 'react';
import Box from '@mui/material/Box';
import type {Statistics} from '../../../types/response';
import OverviewMansonry from './OverviewMansonry';

interface OverviewWrapperProps {
  data: Statistics['scalars'];
  heights: number[] 
}

const OverviewWrapper: FC<OverviewWrapperProps> = ({data, heights}) => (
  <Box>
    <OverviewMansonry data={data} heights={heights}/>
  </Box>
);

export default OverviewWrapper;
