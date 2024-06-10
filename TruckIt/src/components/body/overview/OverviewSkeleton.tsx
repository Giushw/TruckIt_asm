import {FC} from "react";
import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';
import Skeleton from "@mui/material/Skeleton";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

interface OverviewSkeletonProps {
  heights: number[]
}

const OverviewSkeleton: FC<OverviewSkeletonProps> = ({heights}) => (
  <Masonry columns={{xs: 2, md: 3, lg: 4}} spacing={3}>
    {heights.map((height, index) => (
      <Paper key={index} sx={{ height }}>
        <Card variant='elevation' sx={{height: '100%'}}>
          <CardContent sx={{height: '100%'}}>
            <Box display='flex' flexDirection='column' justifyContent='space-between' sx={{height: '100%'}}>
              <Skeleton variant="circular" width={40} height={40} animation="wave" />
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} animation="wave" />
              <Skeleton variant="rounded" width={210} height={60} animation="wave" />
            </Box>
          </CardContent>
        </Card>
      </Paper>
    ))}
  </Masonry>
)

export default OverviewSkeleton;
