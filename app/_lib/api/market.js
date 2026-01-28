import { requestGet } from '@/app/_lib/request'

export async function getMarketPrices() {
  const response = await requestGet('/market/prices')
  return response
}

export async function getAPrice(assetId) {
  const response = await requestGet('/market/prices/' + assetId)
  return response
}