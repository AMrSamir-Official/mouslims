// // hooks/useQuranApi.js

// import { useState } from 'react';

// const BASE_URL = 'https://alquran.cloud/api/v1';

// const fetchData = async (endpoint) => {
//     const response = await fetch(`${BASE_URL}/${endpoint}`);
//     if (!response.ok) {
//         throw new Error('Failed to fetch data');
//     }
//     const json = await response.json();
//     return json.data;
// };

// export const useQuranApi = () => {
//     const [data, setData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     const getEditions = async () => {
//         setLoading(true);
//         try {
//             const result = await fetchData('editions');
//             setData(result);
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const getQuran = async () => {
//         setLoading(true);
//         try {
//             const result = await fetchData('quran');
//             setData(result);
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const getJuz = async (juzNumber) => {
//         setLoading(true);
//         try {
//             const result = await fetchData(`juz/${juzNumber}`);
//             setData(result);
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const getSurah = async (surahNumber) => {
//         setLoading(true);
//         try {
//             const result = await fetchData(`surah/${surahNumber}`);
//             setData(result);
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const getAyah = async (surahNumber, ayahNumber) => {
//         setLoading(true);
//         try {
//             const result = await fetchData(`surah/${surahNumber}/ayah/${ayahNumber}`);
//             setData(result);
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const getSearch = async (query) => {
//         setLoading(true);
//         try {
//             const result = await fetchData(`search/${query}`);
//             setData(result);
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const getManzil = async (manzilNumber) => {
//         setLoading(true);
//         try {
//             const result = await fetchData(`manzil/${manzilNumber}`);
//             setData(result);
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const getRuku = async (rukuNumber) => {
//         setLoading(true);
//         try {
//             const result = await fetchData(`ruku/${rukuNumber}`);
//             setData(result);
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const getPage = async (pageNumber) => {
//         setLoading(true);
//         try {
//             const result = await fetchData(`page/${pageNumber}`);
//             setData(result);
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const getHizbQuarter = async (hizbNumber) => {
//         setLoading(true);
//         try {
//             const result = await fetchData(`hizb/${hizbNumber}`);
//             setData(result);
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const getSajda = async () => {
//         setLoading(true);
//         try {
//             const result = await fetchData('sajda');
//             setData(result);
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const getMeta = async () => {
//         setLoading(true);
//         try {
//             const result = await fetchData('meta');
//             setData(result);
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return {
//         data,
//         loading,
//         error,
//         getEditions,
//         getQuran,
//         getJuz,
//         getSurah,
//         getAyah,
//         getSearch,
//         getManzil,
//         getRuku,
//         getPage,
//         getHizbQuarter,
//         getSajda,
//         getMeta,
//     };
// };
