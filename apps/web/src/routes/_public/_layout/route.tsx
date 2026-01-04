import {
  createFileRoute,
  Link,
  Outlet,
  useMatches,
} from '@tanstack/react-router';

import jungleGamingLogo from '@/assets/images/logo.svg';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/view/components/ui/card';
import { Button } from '@/view/components/ui/button';

export const Route = createFileRoute('/_public/_layout')({
  component: Layout,
});

export function Layout() {
  const matches = useMatches();
  const lastMatch = matches[matches.length - 1];
  const { lead, description, calloutText, authPrompt, authLinkLabel, href } =
    lastMatch.staticData;

  return (
    <div className="flex h-screen items-center justify-center bg-[url('/background.jpg')] bg-cover bg-center p-4">
      <div className="bg-muted/10 h-full w-full rounded-4xl shadow-2xl transition-all md:p-4 lg:max-w-[80%]">
        <div className="bg-muted/10 h-full w-full rounded-3xl shadow-2xl backdrop-blur-xs transition-all lg:p-4">
          <div className="flex h-full w-full gap-4">
            <Card className="card-background flex h-full w-full flex-col items-center justify-center rounded-4xl px-6 transition-all lg:w-1/2 lg:rounded-2xl">
              <div className={'w-full max-w-lg transition-all'}>
                <CardHeader className="mb-6 space-y-2">
                  <div className="flex items-center gap-2">
                    <img src={jungleGamingLogo} alt="" className="h-10 w-10" />
                    <CardTitle className="text-card-foreground text-lg font-medium transition-all lg:text-xl xl:text-2xl">
                      JungleOps
                    </CardTitle>
                  </div>

                  <CardDescription>
                    <p className="text-card-foreground text-sm transition-all xl:text-lg">
                      {lead}
                    </p>
                    <p className="text-xs transition-all xl:text-[1rem]">
                      {description}
                    </p>
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <Outlet />
                </CardContent>

                <CardFooter className="flex flex-col items-start">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground text-sm">
                      {authPrompt}
                    </span>

                    <Button
                      asChild
                      type="button"
                      size="sm"
                      variant="link"
                      className="p-0"
                    >
                      <Link to={href!} search={{ redirect: '/tasks' }}>
                        {authLinkLabel}
                      </Link>
                    </Button>
                  </div>
                </CardFooter>
              </div>
            </Card>

            <Card className="bg-card-foreground/40 hidden h-full w-1/2 items-center justify-center rounded-2xl lg:flex lg:rounded-2xl">
              <p className="text-muted max-w-[300px] text-center text-3xl leading-10 font-bold transition-all xl:max-w-[400px] xl:text-4xl xl:leading-14">
                {calloutText}
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
