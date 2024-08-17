import User from '../createUser/User';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
export const dynamic = 'force-dynamic';
import _ from 'lodash';
export async function GET(request: Request) {
  const jwtoken = cookies().get('token')?.value ?? '';
  try {
    if (!jwtoken) {
      return Response.json({ message: 'no jwt' }, { status: 200 });
    }
    const user = jwt.verify(jwtoken, process.env.JWT_SECRET || '');
    if (!user) {
      return Response.json({ message: 'no jwt' }, { status: 200 });
    }
    // @ts-ignore
    if (user && user.userId) {
      // @ts-ignore
      const loggedUser = await User.findById(user.userId);
      const plainUser = loggedUser.toObject();
      // Clone the plain object
      const clonedUser = _.cloneDeep(plainUser);
      // Now add the userId property
      clonedUser.userId = loggedUser._id;
      console.log('cloned', clonedUser);
      return Response.json(
        {
          message: 'Hi again',
          user: clonedUser
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        message: 'oopsie'
      },
      { status: 500 }
    );
  }
}
