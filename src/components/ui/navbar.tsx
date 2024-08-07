import Link from "next/link";
import {
	Sheet,
	SheetTrigger,
	SheetContent,
	SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { JSX, SVGProps } from "react";
import { getJSONData } from "@/lib/serverUtils";
import { ModeToggle } from "./mode-toggle";
import { DialogTitle, DialogDescription } from "@/components/ui/dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

export default async function Navbar() {
	const data = await getJSONData();

	return (
		<header className="fixed top-0 z-50 w-full bg-lime-100 shadow-sm dark:bg-black">
			<div className="container max-w-5xl mx-auto flex h-18 items-center justify-between py-2 px-4 md:px-6">
				<Link href="/#home" className="text-2xl font-bold" prefetch={false}>
					Pat<span className="text-primary">Luo</span>
				</Link>
				<nav className="hidden space-x-4 lg:flex">
					{data.visual.navbar.links.map((item) => (
						<Link
							href={item.path}
							key={item.path}
							className="text-sm transition-colors  hover:text-primary dark:hover:text-gray-500"
						>
							{item.label}
						</Link>
					))}
				</nav>

				<Sheet>
					<SheetTrigger asChild>
						<Button variant="outline" size="icon" className="lg:hidden">
							<MenuIcon className="h-6 w-6" />
							<span className="sr-only">Toggle navigation menu</span>
						</Button>
					</SheetTrigger>
					<SheetContent side="right" className="w-[250px]">
						<DialogTitle className="font-bold text-">Menu</DialogTitle>
						<DialogDescription className="text-gray-600 dark:text-gray-400">
							<VisuallyHidden.Root>Settings</VisuallyHidden.Root>
						</DialogDescription>
						<div className="grid gap-6 p-6">
							{data.visual.navbar.links.map((item, index) => (
								<SheetClose asChild key={index}>
									<Link
										href={item.path}
										key={item.path}
										className="text-sm transition-colors hover:text-primary dark:hover:text-gray-500"
									>
										{item.label}
									</Link>
								</SheetClose>
							))}
						</div>
					</SheetContent>
				</Sheet>
				<ModeToggle />
			</div>
		</header>
	);
}

function MenuIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<line x1="4" x2="20" y1="12" y2="12" />
			<line x1="4" x2="20" y1="6" y2="6" />
			<line x1="4" x2="20" y1="18" y2="18" />
		</svg>
	);
}
