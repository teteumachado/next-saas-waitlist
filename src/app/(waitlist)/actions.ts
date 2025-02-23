'use server'

import { WaitlistDialogFormType } from './dialog'

export const SubmitWaitlist = async (data: WaitlistDialogFormType) => {
  try {
    const response = await fetch(process.env.ROUTERSO_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.ROUTERSO_TOKEN}`,
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    console.log(await response.json())
  } catch (error) {
    console.error(`Can't submit waitlist: ${error}`)
  }
}
