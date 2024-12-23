This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

Install all dependencies:

```bash
npm install
# or
yarn install
```
then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

**This app uses ZkSync SSO to login using Web3**

- [ZkSync SSO Documentation](https://docs.zksync.io/zksync-era/unique-features/zksync-sso/getting-started) - learn how to integrate ZkSync SSO using their documentation. 

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.

## Pages of the application

**Login pages integrated with ZkSync SSO**

- Click on Let's Play button and follow the steps on the ZkSync SSO Modal
![image](https://github.com/user-attachments/assets/33b98c5f-3896-442d-8554-1bca161cb069)

- Click connect and sign in using your device or scan the QR Code with your phone
![image](https://github.com/user-attachments/assets/b9c5256c-a02a-42b9-8e95-610b84ae0116)

- Select the correct answer and hit the Submit button to advance to the new level and start collecting rewards!
![image](https://github.com/user-attachments/assets/899b2a6f-d727-4375-9108-5fc7102d8f7e)

- Use the bottom navigation bar to go to your profile, and see your savings
![image](https://github.com/user-attachments/assets/ebd1f858-f5da-420a-a405-97fc6c2ba329)


## Blockers and next features integrations

We couldn't integrate Paymaster from the Frontend because we needed a signer to mint an NFT for the user when they advance a level, so they can claim a reward with that NFT.

**Steps**

1 - User completes a sets of questions and advances to the next level

2 - Automatically an ERC-721 gets minted for the user in the background to keep as a price in their profile.

3 - They can go to their profile to see the rewards and claim them.

4 - When they click Claim Rewards! a Smart Contract checks if they hold an NFT and releases an amount of ERC-20 deposited by their Parent or Tutor.
