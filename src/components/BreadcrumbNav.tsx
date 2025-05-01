import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home } from 'lucide-react';

interface BreadcrumbNavProps {
  extraItems?: {
    label: string;
    href?: string;
  }[];
}

const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({ extraItems = [] }) => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(segment => segment !== '');

  // Map path segments to proper names
  const getNameFromPath = (path: string): string => {
    const pathMap: Record<string, string> = {
      'prototype': 'Platform Prototype',
    };
    
    return pathMap[path] || path.charAt(0).toUpperCase() + path.slice(1);
  };
  
  return (
    <div className="container mx-auto px-4 py-2 mt-[72px]">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              <Home className="h-4 w-4 mr-1" />
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          
          <BreadcrumbSeparator />
          
          {pathSegments.map((segment, index) => {
            const isLast = index === pathSegments.length - 1 && extraItems.length === 0;
            const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
            
            return (
              <React.Fragment key={segment}>
                {isLast ? (
                  <BreadcrumbItem>
                    <BreadcrumbPage>{getNameFromPath(segment)}</BreadcrumbPage>
                  </BreadcrumbItem>
                ) : (
                  <BreadcrumbItem>
                    <BreadcrumbLink href={href}>{getNameFromPath(segment)}</BreadcrumbLink>
                  </BreadcrumbItem>
                )}
                
                {!isLast && <BreadcrumbSeparator />}
              </React.Fragment>
            );
          })}
          
          {extraItems.map((item, index) => {
            const isLast = index === extraItems.length - 1;
            
            return (
              <React.Fragment key={`extra-${index}`}>
                {isLast ? (
                  <BreadcrumbItem>
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  </BreadcrumbItem>
                ) : (
                  <BreadcrumbItem>
                    <BreadcrumbLink href={item.href || '#'}>{item.label}</BreadcrumbLink>
                  </BreadcrumbItem>
                )}
                
                {!isLast && <BreadcrumbSeparator />}
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default BreadcrumbNav;