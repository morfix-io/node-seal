describe('Generate Key Pairs', () => {

  describe('BFV KeyGen', () => {
    test('low', async () => {
      const { HCrypt } = process.env.NODE_ENV === 'development'? require('../index.js') : require('../../dist/hcrypt.node.js')
      const Crypt = await HCrypt
      const parms = Crypt.createParams({computationLevel: 'low'})
      Crypt.initialize({...parms, schemeType: 'BFV'})
      const spy = jest.spyOn(Crypt, 'genKeys')
      Crypt.genKeys()
      expect(spy).toHaveBeenCalled()
    })
  })

  describe('CKKS KeyGen', () => {
    test('low', async () => {
      const { HCrypt } = process.env.NODE_ENV === 'development'? require('../index.js') : require('../../dist/hcrypt.node.js')
      const Crypt = await HCrypt
      const parms = Crypt.createParams({computationLevel: 'low'})
      Crypt.initialize({...parms, schemeType: 'CKKS'})
      const spy = jest.spyOn(Crypt, 'genKeys')
      Crypt.genKeys()
      expect(spy).toHaveBeenCalled()
    })
  })
})