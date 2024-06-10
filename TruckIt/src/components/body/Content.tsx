import {FC, useEffect, useState, Fragment} from "react";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import type {Nullable} from '../../types/common';
import type {ResParam, Statistics} from "../../types/response";
import useStatistics from '../../hook/useStatistics';
import useActiveView from '../../hook/useActiveView';
import OverviewSkeleton from "./overview/OverviewSkeleton";
import OverviewWrapper from "./overview/OverviewWrapper";
import MetricsWrapper from "./metrics/MetricsWrapper";
import KpisWrapper from "./kpis/KpisWrapper";
import StatisticsWrapper from "./statistics/StatisticsWrapper";

const DEFAULT_CALL: ResParam = {
  aggregateBy: 'day',
  timeTarget: 'pickup_date',
  startDate: null,
  endDate: null
}

const HEIGHTS_STATIC = [
  275, 186, 229, 273,
  284, 293, 190, 226,
  248, 267, 227, 223
];

const Content: FC = () => {
  const {fetchStatistics} = useStatistics();
  const [state, setState] = useState<Nullable<Statistics>>(null);
  const {activeView} = useActiveView();

  useEffect(() => {
    fetchStatistics(DEFAULT_CALL)
      .then((data: Statistics) => {
        setState(data);
      })
      .catch((error: Error) => {
        console.error('error: ', error);
      });
  }, []);

  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
    >
      <Toolbar />

      {state === null &&
        <OverviewSkeleton heights={HEIGHTS_STATIC} />
      }

      {state !== null &&
        <Fragment>
          {activeView === 'home' &&
            <OverviewWrapper  data={state.scalars} heights={HEIGHTS_STATIC}/>
          }

          {activeView === 'metrics' &&
            <MetricsWrapper data={state.histograms} />
          }

          {activeView === 'carriers' &&
            <KpisWrapper  data={state.kpis.carrier} />
          }

          {activeView === 'customers' &&
            <KpisWrapper  data={state.kpis.client} />
          }

          {activeView === 'statistics' &&
            <StatisticsWrapper data={state.data_table} />
          }
        </Fragment>
      }
    </Box>
  );
}

export default Content;
