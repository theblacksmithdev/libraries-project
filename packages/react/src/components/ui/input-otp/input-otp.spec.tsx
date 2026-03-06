import { render } from '@testing-library/react'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '.'

describe('InputOtp', () => {
  it('renders', () => {
    const { container } = render(<InputOTP maxLength={4}><InputOTPGroup><InputOTPSlot index={0} /><InputOTPSlot index={1} /></InputOTPGroup></InputOTP>)
    const element = container.querySelector('[data-input-otp]') || container.querySelector('input')
    expect(element).toBeTruthy()
  })
})
