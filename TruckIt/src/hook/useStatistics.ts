import {useRef} from 'react';
import json1 from './json1.json';
import json2 from './json2.json';
import type {ResParam, Statistics} from '../types/response';

/**
 * Custom hook for fetching statistics data.
 * @returns An object containing the `fetchStatistics` function.
 */
const useStatistics = () => {
  const toggleRef = useRef(false)

  /**
   * Fetches statistics data based on the provided props.
   * This function has a delay to simulate a slow network call.
   * @param props - The props object containing the necessary parameters for fetching statistics.
   * @returns A promise that resolves to the fetched statistics data.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const fetchStatistics = (_: ResParam): Promise<Statistics> => {
    toggleRef.current = !toggleRef.current
    return new Promise((resolve) => {
      const delay = Math.random() * 3000 + 500
      setTimeout(() => {
        toggleRef.current ? resolve(json1 as Statistics) : resolve(json2 as Statistics)
      }, delay)
    })
  }

  return {fetchStatistics};
}

export default useStatistics;
