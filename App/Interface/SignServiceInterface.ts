interface SignServiceInterface
{
  login(username: string, password: string): Promise<T>(T: object);
}