import { Container,HStack,Button,Center, RadioGroup, Radio} from '@chakra-ui/react';
import axios from 'axios'
import React, { useEffect ,useState} from 'react'
import { server } from '..'
import ErrorComponent from './ErrorComponent';
import Loader from './Loader';
import CoinCard from './CoinCard'

const Coins = () => {
  
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState('inr');

  const currencySymbol= currency==='inr' ? '₹' : currency==='eur'?  '€' : '$';

  const nextHandle=(page)=>{
    setPage(page+1);
    setLoading(true);
  }
  const prevHandle=(page)=>{
    setPage(page-1);
    setLoading(true);
  }

  useEffect(() => {
    const fetchExchanges = async() => {
      try {
        const {data} = await axios.get(`${server}coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=${page}&sparkline=false`);
        setCoins(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    }

    fetchExchanges();
  }, [currency,page]);


  if(error){
    return(
      <ErrorComponent message={'Error while fetching data coins'} />
    )
  }

  return (
    <Container maxW={'container.xl'}>
      {loading ? <Loader></Loader> : <>
        <RadioGroup value={currency} onChange={setCurrency}>
          <HStack spacing={'4'} padding={'8'}>
            <Radio value={'inr'}>INR</Radio>
            <Radio value={'usd'}>USD</Radio>
            <Radio value={'eur'}>EUR</Radio>
          </HStack>
        </RadioGroup>
        <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
          {
            coins.map((i)=> (
              <CoinCard 
              key={i.id} 
              id={i.id}
              name={i.name} 
              price={i.current_price}
              img={i.image} 
              symbol={i.symbol}
              currencySymbol={currencySymbol}
               />
              
            ))
          }
        </HStack>
        <Center>
          <HStack>
            <Button bgColor={'blackAlpha.900'} m={'1'} color={'white'} disabled={page===1} onClick={()=>{prevHandle(page); setLoading(true)}}>Prev</Button>
            <Button bgColor={'blackAlpha.900'} m={'1'} color={'white'} onClick={page!==1?()=>{setPage(1); setLoading(true)}:()=>{}}>1</Button>
            <Button bgColor={'blackAlpha.900'} m={'1'} color={'white'} onClick={page!==2?()=>{setPage(2); setLoading(true)}:()=>{}}>2</Button>
            <Button bgColor={'blackAlpha.900'} m={'1'} color={'white'} display={page<3?'none' :'block'}>{page}</Button>
            <Button bgColor={'blackAlpha.900'} m={'1'} color={'white'} onClick={()=>nextHandle(page)}>Next</Button>
          </HStack>
        </Center>

      </>}
    </Container>
  )
}




export default Coins