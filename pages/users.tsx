import UserModel, { User } from "@/database/model/User";

export default function users({ users }) {
  return <div>{users}</div>;
}

export async function getServerSideProps() {
  const users: User[] = await UserModel.find().exec();
  return {
    props: {
      users,
    },
  };
}
