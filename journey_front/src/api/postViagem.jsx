// import axios from "axios";
// import {useQuery, useMutation} from 'react-query';
// import { useState } from 'react';

// const useViagem = () => {
//   const [carregando, setCarregando] = useState(false);

//   const {data, isLoading, error} = useQuery("motorista", () => axios.get("http://192.168.10.117:8080/motorista").then((res) => res.data));

//   const CadastraViagem = async ({dataStart, orig, dest, time, preco_total, identifier}) => {
//     console.log(dataStart,orig,dest,time,preco_total,identifier)
//     const response = await fetch("http://localhost:8080/viagem", {
//       method: "POST",
//       body: JSON.stringify({
//         idMotorista: identifier,
//         dataStart: dataStart,
//         origem: orig,
//         destino: dest,
//         horasStart : time,
//         precoTotal : preco_total,
//         status : "CONFIRMADO"
//       }),
//       headers: {
//         "Content-type": "application/json; charset=UTF-8",
//       },
//     });

//     return response.json();
//   };

//   const { mutate } = useMutation(CadastraViagem, {
//     onSuccess: () => {
//       setCarregando(false);
//     },
//     onError: (error) => {
//       setCarregando(false);
//     }
//   });

//   return { mutate, data, carregando, isLoading, error };
// }

// export default useViagem;
