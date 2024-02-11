import { MyBookings } from "@/components/bookings/myBookings/MyBookings";
import React from "react";

const getBookings = async () => {
  try {
    const response = await fetch(`${process.env.API_URL}/api/bookings/me`, {
      cache: "no-cache",
      headers: {
        Cookie:
          "next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..DVxuDhr1mNiDTCZD.q55_eC6Rcr_kOlOVfz-V1XDnL21kKtDbMhuU7y6gMJ5skbKTt-gcpuCE_lnHgmxbpnuGsZfLW92b3Q-L8WA6vxX3tLTtD_-k60e9WGB643kBvbrYMtWXmkPmbJGAuUFl3qWvErjPRqSoWAH1h_FoxY64EuKQ98WzNz4iv6Son3Rey-aosz_BQzCN1aesJHZm8yTyF2BgwXM_Pnnv5LM__KgZ4zyU_tFntAOx5vT-9a4Ns1t_oDr0ryX3t4ntRtQfnrQoLUguWXEiLoA7pvF7RKZnmhBy3EfTlEIvU4SmBLLW-JZX8SGIJqax7dXySBLghxcwcW5rcrpJgsWeXgrpHPkHPl5FCN9wejXPrePBD9sCf3Iw15nWn5coDwPZP5A1-Ue8zHHf-U1IH2U6qonuT82Cd7c4_0qVQlVtflZY2uu0q8i-wHEafucwumwlrqVzT94qeiVj2vVe8IfKjr6QV7-3lrELdTjZ8K5VDV8xMpJvZt5dNb7KBaWJswslULg_uu-y5Vh_mYo6AA2O_6uaYzksYtNgzwU_cYWEvfn_zfdo5FP_PLb5FPPucjLVkiac6pO924Znd8H7Xg.geUoVF2_mVcIK1KJuGvGyA",
      },
    });
    const data = await response.json();

    return data.bookings;
  } catch (error) {
    console.log(error);
  }
};

const MyBookingsPage = async () => {
  const data = await getBookings();

  return <MyBookings data={data} />;
};

export default MyBookingsPage;
