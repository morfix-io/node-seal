describe('Generate Keys CKKS Scheme', () => {
  describe('computationLevel low', () => {
    test('256-bit security', async () => {
      const {Seal} = require('../../index.js')
      const Crypt = await Seal
      const parms = Crypt.createParams({computationLevel: 'low', security: 256})
      expect(parms).toEqual({
        polyDegree: 4096,
        coeffModulus: 4096,
        plainModulus: 786433,
        scale: Math.pow(2, 4),
        security: 256
      })
      Crypt.initialize({...parms, schemeType: 'CKKS'})
      expect(Crypt._Context.parametersSet()).toBe(true)

      // Gen Keys
      const spyGenKeys = jest.spyOn(Crypt, 'genKeys')
      Crypt.genKeys()
      expect(spyGenKeys).toHaveBeenCalled()

      // Save / Load keys
      const spySavePublicKey = jest.spyOn(Crypt, 'savePublicKey')
      const publicKey = Crypt.savePublicKey()
      expect(spySavePublicKey).toHaveBeenCalled()

      const spySaveSecretKey = jest.spyOn(Crypt, 'saveSecretKey')
      const secretKey = Crypt.saveSecretKey()
      expect(spySaveSecretKey).toHaveBeenCalled()


      const spyLoadPublicKey = jest.spyOn(Crypt, 'loadPublicKey')
      Crypt.loadPublicKey({encoded: publicKey})
      expect(spyLoadPublicKey).toHaveBeenCalled()

      const spyLoadSecretKey = jest.spyOn(Crypt, 'loadSecretKey')
      Crypt.loadSecretKey({encoded: secretKey})
      expect(spyLoadSecretKey).toHaveBeenCalled()
    })
  })
})